import cn from "classnames";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

export interface AccountProps {
  collapsed?: boolean;
  name?: string;
  initials?: string;
  badge?: string | number;
  className?: string;
}

export default function Account({
  collapsed = false,
  name = "Viggo Mortensen",
  initials = "VM",
  badge = 12,
  className,
}: AccountProps) {
  if (collapsed) {
    return (
      <div className={cn(styles.root, styles.collapsed, className)}>
        <Avatar initials={initials} size="sm" />
        {badge != null && badge !== "" ? (
          <Badge className={styles.collapsedBadge}>{badge}</Badge>
        ) : null}
      </div>
    );
  }

  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div className={cn(styles.root, styles.expanded, className)}>
      <div className={styles.profile}>
        <Avatar initials={initials} size="md" />
        <p className={cn(styles.name, textStyles.bodyLg)}>
          {firstName}
          {lastName ? (
            <>
              <br />
              {lastName}
            </>
          ) : null}
        </p>
        {badge != null && badge !== "" ? <Badge>{badge}</Badge> : null}
      </div>
      <div className={styles.row}>
        <span className={textStyles.bodyLg}>Account</span>
        <span className={styles.chevron}>
          <Icon name="arrowRight" width={16} height={16} />
        </span>
      </div>
    </div>
  );
}
